import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFT", () => {
  const sampleMetadata = {
    name: "Sample NFT",
    description: "Test description",
    uri: "https://example.com/nft/1.json",
  };

  it("mints with metadata and tracks ownership", async () => {
    const [owner, recipient] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    await nft.waitForDeployment();

    const tx = await nft
      .connect(owner)
      .mint(recipient.address, sampleMetadata.name, sampleMetadata.description, sampleMetadata.uri);
    await tx.wait();

    expect(await nft.balanceOf(recipient.address)).to.equal(1);
    expect(await nft.currentTokenId()).to.equal(1n);
    expect(await nft.ownerOf(1n)).to.equal(recipient.address);

    const [meta, ownerAddr] = await nft.tokenMetadata(1n);
    expect(meta.name).to.equal(sampleMetadata.name);
    expect(meta.description).to.equal(sampleMetadata.description);
    expect(meta.mediaURI).to.equal(sampleMetadata.uri);
    expect(ownerAddr).to.equal(recipient.address);
  });

  it("burns tokens when called by owner", async () => {
    const [owner] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    await nft.waitForDeployment();

    await nft.mint(owner.address, sampleMetadata.name, sampleMetadata.description, sampleMetadata.uri);

    await expect(nft.burn(1n)).to.emit(nft, "Burned").withArgs(1n, owner.address);
    await expect(nft.ownerOf(1n)).to.be.revertedWithCustomError(nft, "ERC721NonexistentToken").withArgs(1n);
  });
});
