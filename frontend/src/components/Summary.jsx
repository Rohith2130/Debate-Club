// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Summary = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { messages, character } = location.state || { messages: [], character: "Unknown" };

//   const generateSummary = () => {
//     const userStatements = messages.filter(msg => msg.sender === "user").map(msg => msg.text);
//     const aiResponses = messages.filter(msg => msg.sender === "ai").map(msg => msg.text);

//     let score = 0;

//     if (userStatements.length > 0) {
//       userStatements.forEach((statement, index) => {
//         const lowerStatement = statement.toLowerCase();

//         // Logical structure: Look for words like 'because', 'therefore', 'hence'
//         if (/\b(because|therefore|hence|thus|so|consequently)\b/.test(lowerStatement)) {
//           score += 2;
//         }

//         // Directly addressing AI's argument (rebuttal)
//         if (index < aiResponses.length && lowerStatement.includes("you said")) {
//           score += 2;
//         }

//         // Questioning AI (challenging the response)
//         if (/\?$/.test(statement)) {
//           score += 2;
//         }

//         // Expressing agreement or disagreement
//         if (/\b(i agree|i disagree|that's wrong|you're right)\b/.test(lowerStatement)) {
//           score += 2;
//         }
//       });

//       // Cap score at 10
//       score = Math.min(10, score);
//     }

//     let summary = `**Overview:**  
//     The debate between the user and ${character} had ${userStatements.length} user statement(s) and ${aiResponses.length} response(s) from ${character}.  
//     `;

//     if (userStatements.length === 0) {
//       summary += `\n**Conclusion:**  
//       The debate did not progress as the user did not present any arguments. Engaging more actively would improve the quality of the discussion.`;
//     } else {
//       summary += `
//       **Key Points:**  
//       - **User's Arguments:** ${userStatements.join("; ") || "No clear arguments presented."}  
//       - **${character}'s Responses:** ${aiResponses.join("; ") || "Minimal response from AI."}  
      
//       **Conclusion:**  
//       The user participated with ${userStatements.length} statement(s), leading to a ${score}/10 engagement score. A more structured debate can further enhance the discussion.`;
//     }

//     return { summary, score };
//   };

//   const { summary, score } = generateSummary();

//   return (
//     <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6">
//       <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold text-center mb-4">Debate Summary</h2>
//         <p className="text-lg mb-4 whitespace-pre-line">{summary}</p>
//         <h3 className="text-2xl font-semibold text-center">User Engagement Score: {score}/10</h3>
//         <div className="flex justify-between mt-6">
//           <button
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//             onClick={() => navigate("/agents")}
//           >
//             Start New Debate
//           </button>
//           <button
//             className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
//             onClick={() => navigate("/")}
//           >
//             Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Summary;



import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { messages, character } = location.state || { messages: [], character: "Unknown" };
  const summaryRef = useRef();

  const generateSummary = () => {
    const userStatements = messages.filter(msg => msg.sender === "user").map(msg => msg.text);
    const aiResponses = messages.filter(msg => msg.sender === "ai").map(msg => msg.text);

    let score = 0;

    if (userStatements.length > 0) {
      userStatements.forEach((statement, index) => {
        const lowerStatement = statement.toLowerCase();

        if (/\b(because|therefore|hence|thus|so|consequently)\b/.test(lowerStatement)) {
          score += 2;
        }

        if (index < aiResponses.length && lowerStatement.includes("you said")) {
          score += 2;
        }

        if (/\?$/.test(statement)) {
          score += 2;
        }

        if (/\b(i agree|i disagree|that's wrong|you're right)\b/.test(lowerStatement)) {
          score += 2;
        }
      });

      score = Math.min(10, score);
    }

    let summary = `**Overview:**  
The debate between the user and ${character} had ${userStatements.length} user statement(s) and ${aiResponses.length} response(s) from ${character}.  
`;

    if (userStatements.length === 0) {
      summary += `\n**Conclusion:**  
The debate did not progress as the user did not present any arguments. Engaging more actively would improve the quality of the discussion.`;
    } else {
      summary += `
**Key Points:**  
- **User's Arguments:** ${userStatements.join("; ") || "No clear arguments presented."}  
- **${character}'s Responses:** ${aiResponses.join("; ") || "Minimal response from AI."}  

**Conclusion:**  
The user participated with ${userStatements.length} statement(s), leading to a ${score}/10 engagement score. A more structured debate can further enhance the discussion.`;
    }

    return { summary, score };
  };

  const { summary, score } = generateSummary();

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(summaryRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("debate-summary.pdf");
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6">
      <div ref={summaryRef} className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Debate Summary</h2>
        <p className="text-lg mb-4 whitespace-pre-line">{summary}</p>
        <h3 className="text-2xl font-semibold text-center">User Engagement Score: {score}/10</h3>
      </div>
      <div className="flex justify-between mt-6 gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          onClick={() => navigate("/agents")}
        >
          Start New Debate
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Summary;

