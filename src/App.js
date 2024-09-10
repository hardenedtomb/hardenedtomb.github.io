import { ethers } from "ethers";
import { useRef } from "react";

export default function App() {
  return <>
    <h1>hardened tomb</h1>
    use block device as tomb for secrets: <a href="https://github.com/hardenedtomb/ht">Github</a>
    <ul>
      <li><ComputeAddress /></li>
      <li><ComputeAddressByXY /></li>
    </ul>
  </>;
}

function ComputeAddress() {
  const [arg_key, ret, err] = [useRef(), useRef(), useRef()];
  const f = key => { try { return [ethers.computeAddress(key), `OK`]; } catch (e) { return [undefined, `${e}`]; } };
  const onChange = () => { [ret.current.innerText, err.current.innerText] = f(arg_key.current.value) }
  return <code>computeAddress("<input ref={arg_key} onChange={onChange} />") = <span ref={ret} />; // <span ref={err} /></code>;
}

function ComputeAddressByXY() {
  const [arg_x, arg_y, ret, err] = [useRef(), useRef(), useRef(), useRef()];
  const f = (x, y) => { try { return [ethers.computeAddress(`0x04${x}${y}`), `OK`]; } catch (e) { return [undefined, `${e}`]; } };
  const onChange = () => { [ret.current.innerText, err.current.innerText] = f(arg_x.current.value, arg_y.current.value) }
  return <code>ComputeAddressByXY("<input ref={arg_x} onChange={onChange} />", "<input ref={arg_y} onChange={onChange} />") = <span ref={ret} />; // <span ref={err} /></code>;
}
