import React, { useState, useEffect, useRef, useCallback, type ChangeEvent, type JSX } from 'react';
// These imports simulate using the library installed via 'npm install pdfjs-dist'.
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
// NOTE: Removed the failing 'declare module' and 'pdfjsWorker' import.
// We will now assign the worker source to the expected *local* path.

// Define the structure for the Modal state
interface ModalState {
    visible: boolean;
    title: string;
    message: string;
}

// --- Utility Functions (Outside Component) ---

/**
 * Cleans and sanitizes the extracted text.
 */
const cleanText = (text: string): string => {
    // Replace multiple spaces/newlines with a single space and remove line breaks
    let cleaned = text.replace(/(\s{2,})|(\r\n|\n|\r)/gm, ' ');
    // Remove initial and trailing spaces
    cleaned = cleaned.trim();
    return cleaned;
};

// --- React Component ---

const TypeIt: React.FC = () => {
    // --- State Management ---
    const [bookText, setBookText] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [errors, setErrors] = useState<number>(0);
    const [wpm, setWpm] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<ModalState>({ visible: false, title: '', message: '' });

    // Ref to manage the timer interval outside of render cycle
    const timerRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const targetTextRef = useRef<HTMLDivElement>(null);

    // --- Core UI Functions ---

    const showModal = useCallback((title: string, message: string): void => {
        setModal({ visible: true, title, message });
    }, []);

    const closeModal = useCallback((): void => {
        setModal({ visible: false, title: '', message: '' });
    }, []);

    const stopSession = useCallback((): void => {
        setIsStarted(false);
        if (inputRef.current) {
            inputRef.current.disabled = true;
        }
    }, []);

    const resetSession = useCallback(() => {
        stopSession();
        setBookText('');
        setUserInput('');
        setErrors(0);
        setWpm(0);
        setTime(0);
        // Clear value of the input field
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        // To clear the file input's selected file name:
        const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }, [stopSession]);
    
    // EFFECT: Set up the PDF.js worker source once on mount.
    useEffect(() => {
        // FIX: Reverting to the local path and assuming the user has copied 
        // the pdf.worker.js file to their project's /public directory.
        // This is the cleanest way to avoid both the CDN and bundler import errors.
        GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;
    }, []);


    // --- PDF Parsing Logic (useCallback for stability) ---

    const extractTextFromPDF = useCallback(async (arrayBuffer: ArrayBuffer): Promise<string | null> => {
        try {
            // --- LOGGING PRE-PROCESS (New Log) ---
            console.log(`[PDF Processor] Initiating PDF document load task.`);
            
            // Use the imported getDocument function
            const pdf: any = await getDocument({ data: arrayBuffer }).promise;
            
            // --- LOGGING START (Adjusted for clarity) ---
            console.log(`[PDF Processor] Document object acquired. Total pages: ${pdf.numPages}`);
            
            let fullText = '';
            const numPages: number = pdf.numPages;

            for (let i = 1; i <= numPages; i++) {
                const page: any = await pdf.getPage(i);
                const textContent: any = await page.getTextContent();
                
                // Ensure textContent.items is an array before mapping
                let pageText: string = Array.isArray(textContent.items) 
                    ? textContent.items.map((item: any) => item.str).join(' ')
                    : '';
                fullText += pageText + ' \n\n'; // Add spacing between pages
                
                // --- LOGGING PROGRESS ---
                console.log(`[PDF Processor] Extracted text from page ${i} of ${numPages}`);
            }
            
            // --- LOGGING COMPLETION ---
            console.log(`[PDF Processor] Extraction complete. Cleaning and returning text.`);

            return cleanText(fullText);

        } catch (error) {
            console.error("Error during PDF processing:", error);
            // Check if the error is the version mismatch error, otherwise show general error
            if (typeof error === 'object' && error !== null && 'message' in error && (error as Error).message.includes('API version')) {
                 showModal("PDF Version Mismatch", "There was a fatal mismatch between the main library and the worker script. Please ensure all PDF.js scripts use the exact same version.");
            } else {
                 showModal("PDF Error", "Failed to extract text from the PDF. The file might be corrupted or complex.");
            }
            return null;
        }
    }, [showModal]);


    const handleFileChange = useCallback(async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = event.target.files?.[0]; // Use optional chaining
        if (!file) return;

        if (file.type !== 'application/pdf') {
            showModal("Invalid File", "Please select a valid PDF file (.pdf).");
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            if (e.target?.result instanceof ArrayBuffer) {
                // --- FILE READER SUCCESS (New Log) ---
                console.log(`[File Handler] File read complete. Starting PDF extraction...`); 

                const extractedText = await extractTextFromPDF(e.target.result);
                setIsLoading(false);

                if (extractedText && extractedText.length > 0) {
                    // Start a new session
                    setBookText(extractedText);
                    setUserInput('');
                    setErrors(0);
                    setTime(0);
                    setIsStarted(false);
                    
                    if (inputRef.current) {
                        inputRef.current.value = '';
                        inputRef.current.disabled = false;
                        inputRef.current.focus();
                    }

                    showModal("Text Ready!", "The text has been extracted and your session is ready. Start typing in the box below!");
                } else {
                    setBookText("No readable text could be extracted from the PDF.");
                }
            } else {
                 setIsLoading(false);
                 showModal("Read Error", "File reader did not return ArrayBuffer data.");
            }
        };

        reader.onerror = () => {
            setIsLoading(false);
            showModal("Read Error", "An error occurred while reading the file.");
        };

        reader.readAsArrayBuffer(file);
    }, [extractTextFromPDF, showModal]);

    // --- Typing Logic ---

    const handleTyping = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const newValue: string = event.target.value;
        const newLength: number = newValue.length;

        if (!bookText) return;

        // 1. Start session on first key stroke
        if (!isStarted && newLength > 0) {
            setIsStarted(true);
        }

        if (newLength > bookText.length) return; // Prevent overtyping

        setUserInput(newValue);

        // 2. Calculate Errors
        let currentErrors: number = 0;
        for (let i = 0; i < newLength; i++) {
            if (newValue[i] !== bookText[i]) {
                currentErrors++;
            }
        }
        setErrors(currentErrors);

        // 3. Check completion
        if (newLength === bookText.length && bookText.length > 0) {
            stopSession();
            const totalTime: number = time; 
            // Calculate final WPM, preventing division by zero
            const finalWPM: number = Math.round((bookText.length / 5) / (totalTime / 60) || 0);

            showModal(
                "Session Complete!",
                `Congratulations! Your final WPM is ${finalWPM} with ${currentErrors} errors. Time taken: ${totalTime} seconds.`
            );
        }
    };

    // --- Timer and WPM Effects ---

    // Effect to handle the timer
    useEffect(() => {
        if (isStarted) {
            // Use window.setInterval and cast the return value for clarity in TypeScript
            timerRef.current = window.setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000) as unknown as number; 
        } else {
            if (timerRef.current !== null) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        // Cleanup on unmount or when isStarted changes
        return () => {
            if (timerRef.current !== null) {
                window.clearInterval(timerRef.current);
            }
        };
    }, [isStarted]);

    // Effect to calculate WPM whenever time or input length changes
    useEffect(() => {
        if (isStarted && time > 0) {
            const totalChars: number = userInput.length;
            const minutes: number = time / 60;
            const calculatedWPM: number = Math.round((totalChars / 5) / minutes);
            setWpm(calculatedWPM);
        }
    }, [time, userInput.length, isStarted]);


    // Effect for auto-scrolling
    useEffect(() => {
        if (targetTextRef.current) {
            const textContainer: HTMLDivElement = targetTextRef.current;
            // Find the current character span (which is at index userInput.length)
            const currentSpan = textContainer.children[userInput.length];
            
            // Fix: Check if currentSpan is a valid HTMLElement before accessing offsetTop
            if (currentSpan instanceof HTMLElement) {
                const containerHeight: number = textContainer.clientHeight;
                const currentOffset: number = currentSpan.offsetTop - textContainer.offsetTop;

                // Scroll if the current character is near the bottom edge (75% height) or out of view above
                if (currentOffset > textContainer.scrollTop + (containerHeight * 0.75) || currentOffset < textContainer.scrollTop) {
                    // Scroll to position the current line roughly one third down from the top
                    textContainer.scrollTop = currentOffset - (containerHeight / 3);
                }
            }
        }
    }, [userInput]);

    // --- Rendering the Highlighted Text ---

    const renderText = (): JSX.Element | JSX.Element[] => {
        if (bookText.length === 0) {
            return (
                <div className="text-gray-500 italic">
                    {isLoading ? 'Loading text...' : 'Please upload a PDF file to begin your typing practice.'}
                </div>
            );
        }

        return bookText.split('').map((targetChar, i) => {
            const inputChar: string = userInput[i];
            let classes: string = 'inline-block';

            if (i < userInput.length) {
                // Character has been typed
                if (targetChar === inputChar) {
                    // Correct: Green 500
                    classes += ' text-green-500';
                } else {
                    // Incorrect: Red 500 with underline
                    classes += ' text-red-500 underline decoration-red-500 decoration-2';
                }
            }

            if (i === userInput.length) {
                // Current typing position: Blue underline/highlight and bold
                classes += ' font-bold border-b-2 border-indigo-600 pb-0.5'; 
            }

            // Use non-breaking space for visibility
            const displayChar: string = targetChar === ' ' ? '\u00A0' : targetChar; 

            return (
                <span key={i} className={classes}>
                    {displayChar}
                </span>
            );
        });
    };

    // --- JSX Structure ---

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-gray-50 font-sans">

            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                <header className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Book Typing Practice</h1>
                    <p className="text-gray-600">Upload a PDF to turn it into a custom typing lesson.</p>
                </header>

                {/* File Upload Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <label htmlFor="pdf-upload" className="block text-lg font-medium text-gray-700 mb-3">
                        1. Select a PDF Book
                    </label>
                    <input type="file" id="pdf-upload" accept=".pdf" onChange={handleFileChange} 
                        disabled={isLoading} // Disabled only while loading
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100 cursor-pointer
                    "/>
                    {isLoading && (
                        <p id="loading-status" className="mt-4 text-center text-indigo-600 font-semibold">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Extracting text from PDF (this may take a moment for large files)...
                        </p>
                    )}
                </div>

                {/* Typing Area */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-medium text-gray-800 mb-4">2. Start Typing</h2>
                    <div id="target-text" ref={targetTextRef} className="mb-4 text-gray-700 max-h-40 sm:max-h-60 overflow-y-auto" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                        {renderText()}
                    </div>
                    <textarea 
                        ref={inputRef}
                        rows={5} 
                        placeholder="Start typing the text above here..."
                        value={userInput}
                        onChange={handleTyping}
                        disabled={!bookText || isLoading} // Disabled only if no text or loading
                        className={`w-full p-4 rounded-xl text-gray-800 resize-none transition-all duration-200 border-2 ${bookText && !isLoading ? 'border-gray-200' : 'border-gray-400 bg-gray-50 cursor-not-allowed'}`}
                        style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
                    />
                </div>

                {/* Statistics and Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex space-x-6 mb-4 sm:mb-0 text-gray-700 font-medium">
                        <span>WPM: {wpm}</span>
                        <span>Errors: {errors}</span>
                        <span>Time: {time}s</span>
                    </div>
                    <button onClick={resetSession} disabled={!bookText}
                        className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition duration-150 ease-in-out shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Reset Session
                    </button>
                </div>

                {/* Custom Modal for Messages */}
                {modal.visible && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">{modal.title}</h3>
                            <p className="text-gray-700 mb-6">{modal.message}</p>
                            <button onClick={closeModal}
                                    className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                                Got it
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default TypeIt;