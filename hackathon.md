# Overview

The ChainPay project aims to develop all the features of the Request Network into web components. This project supports community developers by speeding up their development process, helping them avoid bugs, and enabling them to understand how to use the features in real projects.
# Demo information

- [Web application: ChainPay](https://chainpay.a2n.finance)
- [Web components github](https://github.com/a2nfinance/rnw-web-components)
- [Fronend github](https://github.com/a2nfinance/chainpay)
- [Payer transaction history](https://sepolia.etherscan.io/address/0x7b2eb7cEA81Ea3E257dEEAefBE6B0F6A1b411042)
- [Video Demo](https://www.youtube.com/watch?v=OBjp4Ramui8)

# Features

The ChainPay project supports the following payment requests:

- **Simple:** This is the default payment request, already supported by Request Network web components.
- **Swap-to-pay:** Swap Token A to Token B and use Token B to pay invoices.
- **Conversion:** Pay invoices using a token amount equivalent to the invoice's fiat amount.
- **Swap-to-conversion:** Convert a fiat amount to Token B amount, then swap Token A to Token B to pay the invoice.
- **Escrow:** Payment uses an escrow contract.
- **ERC777 Stream:** Continuous payment where a token amount is sent to the receiver's account address periodically. This payment method is a result of a collaboration between Request Network and SuperFluid Finance.

Advanced features are built into the web components, allowing every developer to use them without having to develop from scratch.

We also implemented an integration feature to improve UX:
- **Client list:** This feature shows available client information on the invoice form. It retrieves the customer list from the QuickBooks API and displays it within an autocomplete Svelte component.

# Challenges we ran into

Most of our challenges come from technical aspects.

- **Massive smart contract calls:** The Request Network API is very convenient for developers. However, if errors arise not from the API but from the execution of smart contracts, our team must review each smart contract's code and simulate transaction calls to identify the source and cause of these errors. This process can be exhausting. Our solution is to examine the successful transactions of each smart contract to understand the causes and replicate them until our code functions correctly.

- **Testnet support:** We develop ChainPay using Sepolia to test functionality, but some issues take time to resolve. For example, when performing swap-to-conversion, ChainlinkConversion contracts support limited paths, and UniswapV2Router02 supports limited pairs, so the flow of conversion and swap works only in limited cases. Our solution is to create liquidity pools for tokens related to the conversion request.

Time constraints are also a challenge. During the hackathon, we need to understand Request Network features, frameworks, templates, and other open-source tools. The most time-consuming actions are debugging and reading unit tests to learn how features work.

# Future Development

Adding more features to the web components is our short-term plan. Our long-term plan is the development of a complete application for web3 payment and integration with necessary platforms.
# Conclusion

First of all, we want to thank David and the Request Network engineering team for supporting hackers in this hackathon. Without their support, ChainPay could not have been completed on time. Secondly, this hackathon has significantly improved our knowledge. Through reading code, researching documentation, attending workshops, and development, we have learned how complex payment methods work and how they are implemented in web3 applications. We hope that our project can contribute to the growth of the Request Network community.
