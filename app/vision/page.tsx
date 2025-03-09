export default function OurVision() {
  const testimonials = [
    {
      name: "Alice Johnson",
      text: "Oregano has revolutionized the way I interact with cryptocurrencies. The gasless transactions have made it so much easier for me to manage my digital assets without worrying about fees.",
    },
    {
      name: "Bob Smith",
      text: "As a newcomer to the crypto world, Oregano's user-friendly interface and innovative approach to transaction fees have been a game-changer. I can focus on learning and investing without the added stress of gas fees.",
    },
    {
      name: "Charlie Brown",
      text: "The speed and efficiency of Oregano's platform are unmatched. I've been able to execute transactions quickly and without the hassle of managing gas fees. It's truly a game-changer in the crypto space.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Vision</h1>
      <p className="mb-6">
        At Oregano, our vision is to democratize access to cryptocurrency transactions by eliminating the barriers posed
        by complex fee structures. We believe that blockchain technology should be accessible to everyone, regardless of
        their technical expertise or financial resources.
      </p>
      <p className="mb-6">
        By leveraging innovative meta-transaction technology and our network of relayers, we aim to create a seamless,
        user-friendly experience that allows individuals to focus on the value of their transactions rather than the
        underlying costs.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">User Testimonials</h2>
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-secondary p-4 rounded-lg">
            <p className="italic mb-2">"{testimonial.text}"</p>
            <p className="font-semibold">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

