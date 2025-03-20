
const ResidentsList = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 overflow-hidden">
      {/* Background Shapes (No Overflow) */}
      <div className="absolute w-[30vw] h-[30vw] max-w-72 max-h-72 bg-blue-500 rounded-full blur-3xl opacity-30 inset-0 m-auto"></div>
      <div className="absolute w-[35vw] h-[35vw] max-w-80 max-h-80 bg-green-500 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>
      <div className="absolute w-[25vw] h-[25vw] max-w-64 max-h-64 bg-teal-400 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
    </div>
  );
};

export default ResidentsList;
