import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image
        src="/download.png" // Replace with your image path
        alt="Centered Image"
        width={500} // Adjust size as needed
        height={300}
        className="max-w-full h-auto"
      />
    </div>
  );
}
