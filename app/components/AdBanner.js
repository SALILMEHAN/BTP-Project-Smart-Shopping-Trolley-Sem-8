export default function AdBanner() {
  return (
    <div className="my-4 p-4 text-center rounded-lg shadow-lg text-white animated-gradient">
      <p className="text-sm">Proudly representing</p>
      <h4 className="text-2xl font-bold mt-1">
        Netaji Subhas University of Technology
      </h4>
      <p className="text-sm text-gray-300 mt-1">
        Excellence in Education & Innovation
      </p>
      <a
        href="https://www.nsut.ac.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="mt-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded hover:bg-gray-200 transition">
          Visit NSUT Website
        </button>
      </a>
    </div>
  );
}
