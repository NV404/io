export default function Invoice() {
  return (
    <section
      id="section-invoice"
      className="flex flex-col items-stretch justify-start gap-6"
    >
      <h2 className="font-medium text-2xl">Invoice</h2>

      <div className="flex flex-col items-stretch justify-start divide-y divide-dashed divide-neutral-800">
        <ul className="flex flex-row items-stretch justify-start divide-x divide-dashed divide-neutral-800">
          <li className="px-2 py-1 flex-1 font-medium bg-white/5">Item</li>
          <li className="px-2 py-1 flex-1 font-medium bg-white/5">Price</li>
          <li className="px-2 py-1 flex-1 font-medium bg-white/5">Quantity</li>
          <li className="px-2 py-1 flex-1 font-medium bg-white/5">Total</li>
        </ul>
        <div className="flex flex-col items-stretch justify-start divide-y divide-dashed divide-neutral-800">
          <ul className="flex flex-row items-stretch justify-center divide-x divide-dashed divide-neutral-800">
            <li className="px-2 py-1 flex-1 font-medium bg-white/5">Post</li>
            <li className="px-2 py-1 flex-1">$1</li>
            {/* <li className="px-2 py-1 flex-1">{currentFormData?.postCount}</li>
            <li className="px-2 py-1 flex-1">${currentFormData?.postCount}</li> */}
          </ul>
          <ul className="flex flex-row items-stretch justify-center divide-x divide-dashed divide-neutral-800">
            <li className="px-2 py-1 flex-1 font-medium bg-white/5">Branded</li>
            <li className="px-2 py-1 flex-1">$1</li>
            <li className="px-2 py-1 flex-1">2</li>
            <li className="px-2 py-1 flex-1">$2</li>
          </ul>
          <ul className="flex flex-row items-stretch justify-center">
            <li className="px-2 py-1 flex-1" />
            <li className="px-2 py-1 flex-1" />
            <li className="px-2 py-1 flex-1" />
            <li className="px-2 py-1 flex-1 font-bold text-lg text-green-200">
              $5
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
