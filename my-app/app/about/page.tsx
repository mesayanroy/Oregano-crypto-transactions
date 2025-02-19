export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Oregano</h1>
      <p className="mb-4">
        Oregano is a platform that helps users with their crypto transactions by implementing "gasless transactions via
        meta-transactions". This innovative approach allows users to execute blockchain transactions without directly
        paying the associated gas fees.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">How It Works</h2>
      <p className="mb-4">
        In a gasless transaction, a third party called a "relayer" covers the cost on behalf of the user, making the
        transaction appear "gasless" to the user. This is achieved through a special type of transaction structure known
        as a "meta-transaction", which allows the relayer to submit the transaction on the user's behalf.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Benefits</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Smoother user experience, especially for new users unfamiliar with managing gas fees</li>
        <li>Reduced barrier to entry for blockchain interactions</li>
        <li>Improved transaction speed and efficiency</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">The Role of Relayers</h2>
      <p className="mb-4">
        Relayers are dedicated services that receive signed transaction requests from users, pay the gas fees, and
        submit the transactions to the blockchain on their behalf. They make a profit by charging a small fee on top of
        the gas costs they cover, allowing for a "gasless" experience for the user while maintaining a sustainable
        business model.
      </p>
    </div>
  )
}

