import { useRef } from "react"
import { ethers } from "ethers"
export default function App() { return <><Header /><Tools /></> }
const Header = () => <><h1>hardened tomb</h1><p>{txt.header}: <a href={txt.github}>Github Repo</a> <a href={txt.image}>Qemu Image</a></p></>
const Tools = () => <><h2>tools</h2><p>{txt.tools}</p><ul>{Object.keys(tools).map(v => <li key={v}><Tool f={tools[v]} /></li>)}</ul></>
const Tool = ({ f }) => <ToolFunc t={f.name} N={args(f)} f={f} y={useRef()} />
const ToolFunc = ({ t, f, y, N }) => <code>{t}: <ToolInputs N={N} X={{}} f={V => y.current.innerText = evaluate(() => f(...V))} />= <span ref={y} /></code>
const ToolInputs = ({ N, X, f }) => N.map(n => <span key={n}><input ref={v => X[n] = v} placeholder={n} onChange={() => f(N.map(n => X[n].value))} /> </span>)
const evaluate = f => { try { return `${f()}` } catch (e) { return `# ${e}` } }
const args = f => f.toString().match(/\w+/g).slice(0, f.length)
const txt = {
  header: `use block device as tomb for secrets`,
  tools: `following tools are provided as a supplement to hardened tomb`,
  github: `https://github.com/hardenedtomb/`,
  image: `https://hardenedtomb.github.io/image/`,
}
const tools = {
  is_equal: (x, y) => x === y,
  hex_by_str: msg => ethers.hexlify(new TextEncoder().encode(msg)),
  base58_by_hex: msg => ethers.encodeBase58(msg),
  base64_by_hex: msg => ethers.encodeBase64(msg),
  sha256_by_hex: msg => ethers.sha256(msg),
  sha512_by_hex: msg => ethers.sha512(msg),
  ripemd160_by_hex: msg => ethers.ripemd160(msg),
  address_of_eth_by_pk: pk => ethers.computeAddress(pk),
  address_of_eth_by_xy: (x, y) => ethers.computeAddress(`0x04${x}${y}`),
  sig_of_rs_by_der: sig => sig.match(/^304[456]022[01]0*([0-9a-f]{64})022[01]0*([0-9a-f]{64})$/).slice(1).join(''),
  sig_of_eth_by_der_yp0: sig => `${tools.sig_of_rs_by_der(sig)}1b`,
  sig_of_eth_by_der_yp1: sig => `${tools.sig_of_rs_by_der(sig)}1c`,
}

