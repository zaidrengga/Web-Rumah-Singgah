export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Rumah Singgah Caffe</p>
        <p className="text-gray-500 dark:text-gray-500">Crafted with Next.js, Tailwind CSS, and GSAP</p>
      </div>
    </footer>
  );
}


