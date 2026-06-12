import Image from "next/image";
import { getProperties } from "@/actions/properties";
export default async function Home() {
 const raw = await getProperties()

  return (
    
      <main className="flex flex-1 w-full max-w-278 flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
        HomePage
        <br />
        {raw.map((property) => (
          <div key={property.id} className="mb-2 w-1/4">
            <h2 className="text-xl font-bold">{property.title}</h2>
            <p>{property.description}</p>
          </div>
        ))}
        <br />
      </main>
  );
}
