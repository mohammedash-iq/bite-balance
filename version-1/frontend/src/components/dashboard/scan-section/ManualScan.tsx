import { useState, useEffect } from "react";
import { handleManualMealScan, fetchOptions } from "../../../services/mealService";

function TextScan() {

  const [formData, setFormData] = useState({ portion: '' });
  const [selected, setSelected] = useState("");

  async function handleformSubmit(e) {
    e.preventDefault();
    if (selected === '' || formData.portion === '') {
      alert('Please select both meal and portion size');
      return;
    }
    const result = await handleManualMealScan({ meal: selected, portion: formData.portion });
    console.log(result);
  }


  return (
    <div key="form" className="w-full p-8 rounded-[28px]">
      <h2 className="text-2xl mb-6 font-semibold">What did you have?</h2>
      <div className="space-y-4">
        <form onSubmit={handleformSubmit}>
          <MultiSelectSearch setSelected={setSelected} />
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

function MultiSelectSearch({ setSelected }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [currentSelection, setCurrentSelection] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) {
        updateOptions(query)
      } else {
        setOptions([]);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  async function updateOptions(query) {
    const fetchedOptions = await fetchOptions(query);
    setOptions(fetchedOptions);
  }
  return (
    <div style={{ width: 300 }}>
      <input
        type="text"
        placeholder="search food..."
        value={currentSelection ? currentSelection : query}
        onChange={(e) => { setQuery(e.target.value); setCurrentSelection("") }}
        className="w-full p-4" />
      {options.length > 0 && (
        <ul className="border border-gray-900 max-h-[200px] overflow-y-auto mt-2 p-0 list-none">
          {options.map((item) => (
            <li key={item.id} value={item.id} onClick={(e) => { console.log(e.target.value); setSelected(e.target.value); setCurrentSelection(item.food); setOptions([]) }} className="p-8 cursor-pointer">{item.food}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default TextScan;

