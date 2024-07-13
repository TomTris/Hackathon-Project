const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FundingModule", (m) => {
  const count = m.getParameter("funding");

  const counter = m.contract("Funding", [], {
  });

  return { counter };
});
