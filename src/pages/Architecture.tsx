import { Link } from "react-router-dom";
import { hilSystemArchitecture, hilCreateTaskHTML, hilOutputProcessingHTML } from "@/constants/architecture";

const Architecture = () => {
  const frames = [
    { id: "system", title: "HIL System Architecture", html: hilSystemArchitecture },
    { id: "create", title: "HIL Create Task Service", html: hilCreateTaskHTML },
    { id: "output", title: "HIL Output Processing Service", html: hilOutputProcessingHTML }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-8">
      <div>
        <Link to="/self-service-request" className="text-purple-600 hover:underline">
          Back to Self Service
        </Link>
      </div>
      {frames.map((frame) => (
        <div key={frame.id} className="border rounded-lg overflow-hidden shadow">
          <iframe
            title={frame.title}
            srcDoc={frame.html}
            className="w-full h-[600px] bg-white"
          />
        </div>
      ))}
    </div>
  );
};

export default Architecture;
