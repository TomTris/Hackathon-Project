const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TestingModule", (m) => {
  const counter = m.contract("Testing");

  return { counter };
});