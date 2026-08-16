export default function NotFound() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <h1
        className="font-serif text-[15vw] leading-[0.9] tracking-tighter"
        style={{ color: "#ededed" }}
      >
        404
      </h1>
      <p
        className="font-sans text-sm uppercase tracking-[0.3em] mt-6"
        style={{ color: "rgba(237,237,237,0.4)" }}
      >
        Page not found
      </p>
      <a
        href="/"
        className="mt-12 font-sans text-xs uppercase tracking-[0.25em] px-8 py-4 border inline-block transition-all duration-500 hover:tracking-[0.35em] hover:bg-[#ededed] hover:text-[#0a0a0a]"
        style={{
          color: "#ededed",
          borderColor: "rgba(237,237,237,0.3)",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
