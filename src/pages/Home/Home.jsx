import React from "react";
import './Home.css'
import cryptounderstand from '../../images/cryptounderstand.jpeg'

const Home = () => {
    return <div className="home">

        <div className="container">
            <div className="crypto-info">
                <h1>Cryptocurrency: What It Is and How It Works</h1>
                <p>Cryptocurrencies let you buy goods and services, use apps and games or
                    trade them forprofit. Here's more about what cryptocurrency is and how to protect yourself.</p>
                <iframe width="760" height="400" src="https://www.youtube.com/embed/Mvrq8hLjcRk"
                    title="Cryptocurrency explained" frameBorder="0" allow="accelerometer; autoplay;
                      clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <h2> What Is Cryptocurrency?</h2>
                <p>
                    A cryptocurrency is a digital or virtual currency that is secured by cryptography, which makes
                    it nearly impossible to counterfeit or double-spend. Many cryptocurrencies are decentralized
                    networks based on blockchain technology—a distributed ledger enforced by a disparate network
                    of computers. </p>

                <p>A defining feature of cryptocurrencies is that they are generally not issued by any central
                    authority, rendering them theoretically immune to government interference or manipulation. </p>

                <div className="crypto-key-take-aways">
                    KEY TAKEAWAYS
                </div>

                <ul>
                    <li>A cryptocurrency is a form of digital asset based on a network that is distributed across
                        a large number of computers. This decentralized structure allows them to exist outside the
                        control of governments and central authorities.</li>
                    <li>Some experts believe that blockchain and related technology will disrupt many industries,
                        including finance and law.</li>
                    <li>The advantages of cryptocurrencies include cheaper and faster money transfers and decentralized
                        systems that do not collapse at a single point of failure.</li>
                    <li>The disadvantages of cryptocurrencies include their price volatility, high energy consumption
                        for mining activities, and use in criminal activities.</li>
                </ul>

                <img src={cryptounderstand} alt="#" />
                <h2>Understanding Cryptocurrencies</h2>
                <p>Cryptocurrencies are digital or virtual currencies underpinned by cryptographic systems.
                    They enable secure online payments without the use of third-party intermediaries. "Crypto"
                    refers to the various encryption algorithms and cryptographic techniques that safeguard these
                    entries, such as elliptical curve encryption, public-private key pairs, and hashing functions.
                </p>
                <p>Cryptocurrencies can be mined or purchased from cryptocurrency exchanges. Not all e-commerce
                    sites allow purchases using cryptocurrencies. In fact, cryptocurrencies, even popular ones like
                    Bitcoin, are hardly used for retail transactions. However, the skyrocketing value of
                    cryptocurrencies has made them popular as trading instruments. To a limited extent, they are
                    also used for cross-border transfers.</p>

                <h2>Blockchain </h2>
                <p>Central to the appeal and functionality of Bitcoin and other cryptocurrencies is blockchain
                    technology. As its name indicates, blockchain is essentially a set of connected blocks or
                    an online ledger. Each block contains a set of transactions that have been independently
                    verified by each member of the network. </p>
                <p>Every new block generated must be verified by each node before being confirmed, making it
                    almost impossible to forge transaction histories. The contents of the online ledger must
                    be agreed upon by the entire network of an individual node, or computer maintaining a
                    copy of the ledger. </p>
                <p>Experts say that blockchain technology can serve multiple industries, such as supply chains,
                    and processes such as online voting and crowdfunding. Financial institutions such as JPMorgan
                    Chase & Co. (JPM) are testing the use of blockchain technology to lower transaction costs by
                    streamlining payment processing.</p>

                <h2>Types of Cryptocurrency</h2>
                <p>Bitcoin is the most popular and valuable cryptocurrency. An anonymous person called Satoshi
                    Nakamoto invented it and introduced it to the world via a white paper in 2008. There are
                    thousands of cryptocurrencies present in the market today. </p>
                <p>Each cryptocurrency claims to have a different function and specification. For example,
                    Ethereum's ether markets itself as gas for the underlying smart contract platform. Ripple's
                    XRP is used by banks to facilitate transfers between different geographies. </p>
                <p>Bitcoin, which was made available to the public in 2009, remains the most widely traded and
                    covered cryptocurrency. As of May 2022, there were over 19 million bitcoins in circulation
                    with a total market cap of around $576 billion. Only 21 million bitcoins will ever exist.</p>
                <p>In the wake of Bitcoin's success, many other cryptocurrencies, known as "altcoins," have been
                    launched. Some of these are clones or forks of Bitcoin, while others are new currencies that
                    were built from scratch. They include Solana, Litecoin, Ethereum, Cardano, and EOS. By November 2021,
                    the aggregate value of all the cryptocurrencies in existence had reached over $2.1 trillion—Bitcoin
                    represented approximately 41% of that total value.</p>   
            </div>
        </div>
    </div>
}

export default Home
