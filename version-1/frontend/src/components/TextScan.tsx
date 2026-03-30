function TextScan() {
  return (
    <div key="form" className="w-full p-8 rounded-[28px]">
      <h2 className="text-2xl mb-6 font-semibold">What did you have?</h2>
      <div className="space-y-4">
        <div className="relative">
          <select className="w-full  px-4 py-4 rounded-t-lg  border-[#938f99] outline-none">
            <option>Meal Type</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>
        </div>

        <div className="relative">
          <select className="w-full px-4 py-4 rounded-t-lg  border-[#938f99] outline-none ">
            <option>Meal</option>
            <option>Dosa</option>
            <option>Idli</option>
          </select>
        </div>

        <button className="w-full mt-4 border border-gray-200  py-4 rounded-full font-medium hover:bg-green-300 ">
          Submit
        </button>
      </div>
    </div>
  );
}

export default TextScan;
