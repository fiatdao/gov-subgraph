import {Delegate, DelegatedPowerDecreased, DelegatedPowerIncreased, Comitium} from "../../generated/Comitium/Comitium";
import {common} from "../common";
import {constants} from "../constants";

export function handleDelegate(event: Delegate): void {
    let voter = common.createVoterIfNonExistent(event.params.from);
    voter.hasActiveDelegation = !event.params.to.equals(constants.ZERO_ADDRESS);
    voter.save();
}

export function handleDelegatedPowerIncreased(event: DelegatedPowerIncreased): void {
    let voter = common.createVoterIfNonExistent(event.params.to);
    voter.delegatedPower = event.params.to_newDelegatedPower;

    let overview = common.getOverview();
    overview.totalDelegatedPower = overview.totalDelegatedPower.plus(event.params.amount);
    overview.save();

    // First time getting delegation && does not have tokens staked yet
    if (voter.tokensStaked.equals(constants.BIGINT_ZERO) && event.params.amount.equals(event.params.to_newDelegatedPower)) {
        voter.isComitiumUser = true;
        common.updateComitiumUsers(1);
    }
    voter.save();

    common.updateVotingPower(event.params.from, event.address);
    common.updateVotingPower(event.params.to, event.address);
}

export function handleDelegatedPowerDecreased(event: DelegatedPowerDecreased): void {
    let voter = common.createVoterIfNonExistent(event.params.to);
    voter.delegatedPower = event.params.to_newDelegatedPower;

    let overview = common.getOverview();
    overview.totalDelegatedPower = overview.totalDelegatedPower.minus(event.params.amount);
    overview.save();

    // Does not have delegation or tokens staked
    if (voter.tokensStaked.equals(constants.BIGINT_ZERO) && voter.delegatedPower.equals(constants.BIGINT_ZERO)) {
        voter.isComitiumUser = false;
        common.updateComitiumUsers(-1);
    }
    voter.save();

    common.updateVotingPower(event.params.from, event.address);
    common.updateVotingPower(event.params.to, event.address);
}
