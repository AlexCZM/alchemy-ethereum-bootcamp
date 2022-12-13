const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  /* in order to check if a name (data) is in the Merkle tree we need:
   *   - name -> or leaf to be checked if it's in the tree
   *   - proof -> merkle tree path to create root from name
   *   - root -> it's assumed the server keeps track of it
   * */

  const name = "Shelby Toy"; // change the name
  const merkleTree = new MerkleTree(niceList);

  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof,
  });

  console.log({ gift });
}

main();
