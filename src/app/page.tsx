import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="text-center mt-12 lg:mt-28">
        <p className="text-gray-600">Trusted by these companies: </p>
        <div className="flex gap-8 *:h-10 mt-6 justify-center grayscale">
          <img src="https://redis.io/wp-content/uploads/2024/09/adobe-logo.svg?&auto=webp&quality=85,75&width=80" alt="" />
          <img src="https://redis.io/wp-content/uploads/2024/09/zapier-logo.svg?&auto=webp&quality=85,75&width=100" alt="" />
          <img src="https://redis.io/wp-content/uploads/2024/09/ibm-logo.svg?&auto=webp&quality=85,75&width=80" alt="" />
          <img src="https://redis.io/wp-content/uploads/2024/09/uber-logo-1.svg?&auto=webp&quality=85,75&width=80" alt="" />
          <img src="https://redis.io/wp-content/uploads/2024/09/siriusxm-logo.svg?&auto=webp&quality=85,75&width=100" alt="" />
          <img src="https://redis.io/wp-content/uploads/2024/09/fiver-logo.svg?&auto=webp&quality=85,75&width=80" alt="" />
          <img src="https://redis.io/wp-content/uploads/2024/09/waze-logo.svg?&auto=webp&quality=85,75&width=100" alt="" />
          <img src="https://redis.io/wp-content/uploads/2024/09/niantic-logo.svg?&auto=webp&quality=85,75&width=100" alt="" />
        </div>
      </section>
    </>
  );
}
