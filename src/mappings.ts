import {
    handleProposalCreated,
    handleProposalCanceled,
    handleProposalExecuted,
    handleProposalQueued } from "./governance/proposals";
import { handleVote, handleVoteCanceled } from './governance/votes';
import { handleAbrogationProposalStarted,
    handleAbrogationProposalVote,
    handleAbrogationProposalVoteCancelled,
    handleAbrogationProposalExecuted } from './governance/abrogation';
import {handleDelegate, handleDelegatedPowerIncreased, handleDelegatedPowerDecreased} from './comitium/delegations';
import {handleDeposit, handleWithdraw} from './comitium/deposits-withdrawals';
import {handleLock} from './comitium/locks';
import {handleTransfer} from "./token/transfers";
import {handleClaim} from "./fdt-airdrop/claims";

/**
 * GOVERNANCE
 */
export {
    /**
     * Proposal Events
     */
    handleProposalCreated,
    handleProposalCanceled,
    handleProposalExecuted,
    handleProposalQueued,

    /**
     * Vote Events
     */
    handleVote,
    handleVoteCanceled,

    /**
     * Abrogation Events
     */
    handleAbrogationProposalStarted,
    handleAbrogationProposalVote,
    handleAbrogationProposalVoteCancelled,
    handleAbrogationProposalExecuted,
}

/**
 * COMITIUM
 */
export {
    handleDeposit,
    handleWithdraw,
    handleLock,
    handleDelegate,
    handleDelegatedPowerIncreased,
    handleDelegatedPowerDecreased
}

/** TOKEN */
export {
    handleTransfer
}

/** FDTAirdrop */
export {
    handleClaim
}
