 export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center py-8" role="status">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="sr-only">Loading tasks...</span>
      </div>
    );
  }
  
 
  interface ErrorMessageProps {
    message: string;
  }
  
  export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div 
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4" 
        role="alert"
        aria-live="assertive"
      >
        <p>{message}</p>
      </div>
    );
  }