export default function HelpSection() {
  return (
    <div className="mt-8 border-t border-gray-700 pt-5 text-white">
      <h4 className="text-lg font-semibold">Need Assistance?</h4>
      <p className="text-sm text-gray-300 mt-2">
        Have questions or need help with this platform? Feel free to reach out!
      </p>
      <div className="flex gap-3 mt-3">
        <a
          href="https://portfolio-nextjs-theta-two.vercel.app/contact"
          target="_blank"
        >
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition">
            Chat with Me
          </button>
        </a>
        <a href="tel:8076593098">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition">
            Schedule a Call
          </button>
        </a>
      </div>
    </div>
  );
}
