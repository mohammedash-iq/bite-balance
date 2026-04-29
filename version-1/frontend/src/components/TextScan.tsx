import { useState } from "react";
function TextScan() {
  function handleformSubmit(e) {
    if (formData.meal === '' || formData.portion === '') {
      alert('Please select both meal and portion size');
      return;
    }
    e.preventDefault();
    console.log(formData);
  }
  const [formData, setFormData] = useState({ meal: '', portion: '' });
  return (
    <div key="form" className="w-full p-8 rounded-[28px]">
      <h2 className="text-2xl mb-6 font-semibold">What did you have?</h2>
      <div className="space-y-4">

        <form onSubmit={handleformSubmit}>
          <div className="relative">
            <select onChange={(e) => { setFormData({ ...formData, meal: e.target.value }) }} className="w-full px-4 py-4 rounded-t-lg  border-[#938f99] outline-none" required>
              <option value='' >Meal</option>
              <option value="Dosa">Dosa</option>
              <option value="idli">Idli</option>
            </select>
          </div>
          <div className="relative">
            <select onChange={(e) => { setFormData({ ...formData, portion: e.target.value }) }} className="w-full px-4 py-4 rounded-t-lg  border-[#938f99] outline-none" required>
              <option value='' >Portion</option>
              <option value="extra large">Extra Large</option>
              <option value="large" >Large</option>
              <option value="Medium">Medium</option>
              <option value="small">Small</option>
            </select>
          </div>

          <button className="w-full mt-4 border border-gray-200  py-4 rounded-full font-medium hover:bg-green-300 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TextScan;
