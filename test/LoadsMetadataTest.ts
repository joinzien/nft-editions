// Copyright Zien X Ltd

"use strict";

import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  DropCreator,
  ExpandedNFT
} from "../typechain";

describe("LoadMetadata", () => {
  let signer: SignerWithAddress;
  let signerAddress: string;

  let artist: SignerWithAddress;
  let artistAddress: string;

  let dynamicSketch: DropCreator;

  let minterContract: ExpandedNFT;

  beforeEach(async () => {
    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();

    artist = (await ethers.getSigners())[1];
    artistAddress = await artist.getAddress();

    const { DropCreator } = await deployments.fixture([
      "DropCreator",
      "ExpandedNFT",
    ]);

    const dynamicMintableAddress = (
      await deployments.get("ExpandedNFT")
    ).address;

    dynamicSketch = (await ethers.getContractAt(
      "DropCreator",
      DropCreator.address
    )) as DropCreator;


  });

  it("Load metadata, not as the owner", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await expect(minterContract.connect(artist).loadMetadataChunk(
      1, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    )).to.be.revertedWith("caller is not the owner");;

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(false);
  });

  it("Load metadata below the starting index", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await expect(minterContract.loadMetadataChunk(
      0, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    )).to.be.revertedWith("StartIndex > 0");

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(false);
  });

  it("Load metadata over the ending index", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await expect(minterContract.loadMetadataChunk(
      2, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    )).to.be.revertedWith("Data large than drop size");

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(false);
  });

  it("Load metadata", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);
  });

  it("Load multiple metadata chunks", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      20);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    );

    await minterContract.loadMetadataChunk(
      11, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);
  });

  it("Overlapping metadata chunks", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      20);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    );

    await minterContract.loadMetadataChunk(
      5, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    );

    await minterContract.loadMetadataChunk(
      11, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);
  });

  it("Incomplete metadata loading", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      20);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    );

    await minterContract.loadMetadataChunk(
      5, 10,
      ["This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all",
        "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all", "This is a testing token for all"],
      ["https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy",
        "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy"],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"],
      ["", "", "", "", "", "", "", "", "", ""],
      ["0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(false);
  });

  it("Load redeemed metadata, not as the owner", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await expect(minterContract.connect(artist).loadRedeemedMetadata(
      1,
      "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "0x0000000000000000000000000000000000000000000000000000000000000000",
      "", "0x0000000000000000000000000000000000000000000000000000000000000000"
    )).to.be.revertedWith("caller is not the owner");;

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(false);
  });

  it("Load redeemed metadata below the starting index", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await expect(minterContract.loadRedeemedMetadata(
      0,
      "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "0x0000000000000000000000000000000000000000000000000000000000000000",
      "", "0x0000000000000000000000000000000000000000000000000000000000000000"
    )).to.be.revertedWith("tokenID > 0");

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(false);
  });

  it("Load redeemed metadata over the ending index", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await expect(minterContract.loadRedeemedMetadata(
      11,
      "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "0x0000000000000000000000000000000000000000000000000000000000000000",
      "", "0x0000000000000000000000000000000000000000000000000000000000000000"
    )).to.be.revertedWith("tokenID <= drop size");

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(false);
  });

  it("Load redeemed metadata", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadRedeemedMetadata(
      1,
      "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", "0x0000000000000000000000000000000000000000000000000000000000000001",
      "", "0x0000000000000000000000000000000000000000000000000000000000000002"
    );

    expect(await minterContract.getRedeemedAnimationUrl(1)).to.be.equal("https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy");
    expect(await minterContract.getRedeemedAnimationHash(1)).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000001");
    expect(await minterContract.getRedeemedImageUrl(1)).to.be.equal("");
    expect(await minterContract.getRedeemedImageHash(1)).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000002");

    await minterContract.updateRedeemedURLs(
      1, "https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy", ""
    );

    expect(await minterContract.getRedeemedAnimationUrl(1)).to.be.equal("");
    expect(await minterContract.getRedeemedAnimationHash(1)).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000001");
    expect(await minterContract.getRedeemedImageUrl(1)).to.be.equal("https://ipfs.io/ipfsbafybeify52a63pgcshhbtkff4nxxxp2zp5yjn2xw43jcy4knwful7ymmgy");
    expect(await minterContract.getRedeemedImageHash(1)).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000002");
  });

  it("getDescription", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getDescription(1);
    expect(variable).to.be.equal("1");
  });

  it("getImageUrl", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getImageUrl(1);
    expect(variable).to.be.equal("11");
  });

  it("getAnimationUrl", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getAnimationUrl(1);
    expect(variable).to.be.equal("https://ipfs.io/1");
  });

  it("getRedeemedImageUrl", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getRedeemedImageUrl(1);
    expect(variable).to.be.equal("");
  });

  it("getRedeemedAnimationUrl", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getRedeemedAnimationUrl(1);
    expect(variable).to.be.equal("");
  });

  it("getRedeemedAnimationHash", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getRedeemedAnimationHash(1);
    expect(variable).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
  });

  it("getRedeemedImageHash", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getRedeemedImageHash(1);
    expect(variable).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
  });

  it("getAnimationHash", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getAnimationHash(1);
    expect(variable).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000001");
  });

  it("getImageHash", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getImageHash(1);
    expect(variable).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000011");
  });

  it("getConditionReportUrl", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getConditionReportUrl(1);
    expect(variable).to.be.equal("");
  });

  it("getConditionReportHash", async () => {
    await dynamicSketch.createDrop(
      artistAddress,
      "Testing Token",
      "TEST",
      10);

    const dropResult = await dynamicSketch.getDropAtId(0);
    minterContract = (await ethers.getContractAt(
      "ExpandedNFT",
      dropResult
    )) as ExpandedNFT;

    await minterContract.loadMetadataChunk(
      1, 10,
      ["1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10"],
      ["https://ipfs.io/1", "https://ipfs.io/2",
        "https://ipfs.io/3", "https://ipfs.io/4",
        "https://ipfs.io/5", "https://ipfs.io/6",
        "https://ipfs.io/7", "https://ipfs.io/8",
        "https://ipfs.io/9", "https://ipfs.io/10"],
      ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000000000000000000000000000000000000000005", "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x0000000000000000000000000000000000000000000000000000000000000007", "0x0000000000000000000000000000000000000000000000000000000000000008",
        "0x0000000000000000000000000000000000000000000000000000000000000009", "0x000000000000000000000000000000000000000000000000000000000000000A"],
      ["11", "12", "13", "14", "15", "16", "17", "18", "19", "110"],
      ["0x0000000000000000000000000000000000000000000000000000000000000011", "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000013", "0x0000000000000000000000000000000000000000000000000000000000000014",
        "0x0000000000000000000000000000000000000000000000000000000000000015", "0x0000000000000000000000000000000000000000000000000000000000000016",
        "0x0000000000000000000000000000000000000000000000000000000000000017", "0x0000000000000000000000000000000000000000000000000000000000000018",
        "0x0000000000000000000000000000000000000000000000000000000000000019", "0x000000000000000000000000000000000000000000000000000000000000001A"]
    );

    const metadataLoaded = await minterContract.metadataloaded();
    expect(metadataLoaded).to.be.equal(true);

    const variable = await minterContract.getConditionReportHash(1);
    expect(variable).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
  });

});
