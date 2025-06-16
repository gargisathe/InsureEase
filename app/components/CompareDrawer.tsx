// components/CompareDrawer.tsx
"use client";
import { useState, useEffect, useRef } from "react";

interface Plan { name: string; url: string; }
export default function CompareDrawer({ isOpen, onClose }: { isOpen: boolean; onClose(): void }) {
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
  const [planAUrl, setPlanAUrl] = useState(""), [planBUrl, setPlanBUrl] = useState("");
  const fileA = useRef<HTMLInputElement>(null), fileB = useRef<HTMLInputElement>(null);

  useEffect(() => { setAvailablePlans(JSON.parse(localStorage.getItem("savedPlans")||"[]")); }, []);
  useEffect(() => { localStorage.setItem("savedPlans", JSON.stringify(availablePlans)); }, [availablePlans]);

  const addPlan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if(!f) return;
    if(availablePlans.some(p=>p.name===f.name)){ alert(`"${f.name}" already added.`); e.target.value=""; return; }
    const url = URL.createObjectURL(f);
    setAvailablePlans(a=>[...a,{name:f.name,url}]);
    alert(`Uploaded "${f.name}" successfully.`);
    e.target.value = "";
  };
  if(!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="relative ml-auto w-2/5 bg-white h-full shadow-xl p-6 flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Compare Plans</h2>
        {["Your Current Plan","Plan to Compare"].map((label,i)=>
          <div key={i}>
            <label className="block mb-1">{label}</label>
            <div className="flex gap-2">
              <select value={i===0?planAUrl:planBUrl} onChange={e=>i===0?setPlanAUrl(e.target.value):setPlanBUrl(e.target.value)}
                className="flex-1 border px-2 py-1 rounded">
                <option value="">Select a plan…</option>
                {availablePlans.map((p,j)=><option key={j} value={p.url}>{p.name}</option>)}
              </select>
              <button onClick={()=> (i===0?fileA:fileB).current?.click()} className="px-3 py-1 bg-gray-200 rounded">+ Add</button>
              <input ref={i===0?fileA:fileB} type="file" accept="application/pdf" onChange={addPlan} className="hidden"/>
            </div>
          </div>
        )}
        <button disabled={!planAUrl||!planBUrl}
          className={`mt-2 px-4 py-2 rounded ${planAUrl&&planBUrl?"bg-gray-900 text-gray-50":"bg-gray-200 text-gray-500 cursor-not-allowed"}`}>
          Compare
        </button>
        <div className="flex-1 flex gap-2 border border-gray-200 rounded overflow-hidden">
          {!(planAUrl&&planBUrl) 
            ? <p className="m-auto text-sm text-gray-600">Please select two plans to preview.</p>
            : <>
                { [planAUrl,planBUrl].map((u,j)=>
                  <div key={j} className="flex-1 h-full">
                    <h3 className="font-semibold mb-2 text-center">Plan {j===0?"A":"B"}</h3>
                    <iframe src={u} className="w-full h-[calc(100%-1.5rem)]" title={`Plan ${j===0?"A":"B"} preview`}/>
                  </div>
                )}
              </>
          }
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 border rounded text-gray-700">Close</button>
          <button disabled className="px-4 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed">Email Comparison</button>
        </div>
      </div>
    </div>
  );
}
