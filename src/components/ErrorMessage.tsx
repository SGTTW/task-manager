// function ErrorMessage({ message }: ErrorMessageProps) {
//   return (
//     <div
//       className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4"
//       role="alert"
//       aria-live="assertive"
//     >
//       <p>{message}</p>
//     </div>
//   );
// }

// export default ErrorMessage;


// src/components/ErrorMessage.tsx
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