export default function CourseContent() {
    const sections = [
      { title: "Section 1: Lip Botox Education", progress: "0/5", duration: "30 min" },
      { title: "Section 2: 3D Kiss Lips", progress: "0/8", duration: "45 min" },
      { title: "Section 3: Basic Botox Training", progress: "0/3", duration: "15 min" },
      { title: "Section 4: Arabian Lips", progress: "0/6", duration: "48 min" },
      { title: "Section 5: Lips Dissolve", progress: "0/2", duration: "20 min" },
      { title: "Section 6: Botox Training", progress: "0/2", duration: "20 min" },
    ];
  
    return (
      <div className="w-full max-w-sm bg-white rounded-md shadow-md p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-sm font-medium text-gray-500">Course content</span>
          <button className="text-xl font-bold text-gray-500 hover:text-black">×</button>
        </div>
  
        <h2 className="text-lg font-semibold text-gray-900 mt-4 leading-snug">
          Lip Botox Training & Application in Aesthetic Centers
        </h2>
  
        <div className="mt-4 space-y-3">
          {sections.map((section, index) => (
            <div key={index} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">{section.title}</p>
                  <p className="text-xs text-gray-500">{section.progress} | {section.duration}</p>
                </div>
                <span className="text-lg text-gray-500">⌄</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }  