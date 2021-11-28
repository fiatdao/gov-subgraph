import {
    Claimed,
} from "../../generated/FDTAirdrop/ERC20MerkleDistributor";
import {Claim} from "../../generated/schema";
import {ethereum, log, Bytes} from "@graphprotocol/graph-ts/index";
import {Address, BigInt} from "@graphprotocol/graph-ts";
import {common} from "../common";

export function handleClaim(event: Claimed): void {
    let claim = new Claim(event.params.account.toString());
    let overview = common.getOverview();

    overview.totalDelegatedPower = overview.totalDelegatedPower.plus(event.params.amount);
    claim.claimerIndex = event.params.index;
    claim.claimer = event.params.account;
    claim.claimAmount = event.params.amount;
    claim.adjustedAmount = event.params.adjustedAmount;
    claim.redistributedAmount = claim.claimAmount.minus(claim.adjustedAmount);

    overview.totalFDTAirdropClaimed = overview.totalFDTAirdropClaimed.plus(claim.adjustedAmount);
    overview.totalFDTAirdropRedistributed = overview.totalFDTAirdropRedistributed.plus(claim.redistributedAmount);

    overview.save();
    claim.save();
}
