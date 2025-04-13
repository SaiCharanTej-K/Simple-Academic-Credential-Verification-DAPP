import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "./artifacts/contracts/Credential.sol/Credential.json";
import "./App.css";

const contractAddress = "0x2616e0bD7c894F434ae2C3846B69546345409CCD";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [form, setForm] = useState({ name: "", course: "", institution: "", date: "" });
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const init = async () => {
      const provider = new BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      const cred = new Contract(contractAddress, abi.abi, signer);
      setContract(cred);
      fetchRecords(cred, address);
    };

    init();
  }, []);

  const fetchRecords = async (contractInstance, address) => {
    const data = await contractInstance.getCredentials(address);
    setRecords(data);
  };

  const handleIssue = async () => {
    const tx = await contract.issueCredential(
      account,
      form.name,
      form.course,
      form.institution,
      form.date
    );
    await tx.wait();
    alert("Credential Issued!");
    fetchRecords(contract, account);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>📘 Academic Credential Verification</h2>
      <p><strong>Connected Wallet:</strong> {account}</p>

      <h3>Issue Credential</h3>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Course" onChange={(e) => setForm({ ...form, course: e.target.value })} />
      <input placeholder="Institution" onChange={(e) => setForm({ ...form, institution: e.target.value })} />
      <input placeholder="Date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <button onClick={handleIssue}>Issue</button>

      <h3>Issued Credentials</h3>
      {records.map((rec, idx) => (
        <div key={idx} style={{ marginTop: "10px", padding: "10px", border: "1px solid gray" }}>
          <p><strong>Name:</strong> {rec.studentName}</p>
          <p><strong>Course:</strong> {rec.course}</p>
          <p><strong>Institution:</strong> {rec.institution}</p>
          <p><strong>Date:</strong> {rec.issuedDate}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
