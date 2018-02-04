## Transaction Protocols

These dictate the type and scope of communication between 

e.g., Lightweight, OleTx, WSAT

### Lightweight
- Single AppDomain
- Single durable RM
- Multiple volatile RMs
- No cross AppDomain calls

### OleTX (Windows only)

- Allows cross AppDomain
- Allows cross machine calls
- Multiple durable RM
- RPC calls only
- Typically used in windows intranets

### WSAT

- Everything OleTx has
- Except it can go across firewalls and is cross platform

It is cross platform because it supports HTTP.

## Transaction Managers

Define boundaries and communication rules

#### Lightweight Transaction Manager (LTM)
- Uses Lightweight protocol

#### Kernel Resource Manager (KRM)
- Uses light weight protocol 
- Can call transactional file system and transaction registry on windows

#### Distributed Transaction Coordinator (DTC)
- Manage transactions across process and machine boundary
- Can use either OleTx or WSAT protocols

## Instructing your code to use appropriate Transaction Manager

You don't! System.Transactions has *Promotion* capability.

Within a transaction scope, each remote call you make will create it's own transaction.
In other words, if the resource you are calling is a `ResourceManager`, it will be registered within the `TransactionManager`.

```
// define atomic transaction scope
using (var scope = new TransactionScope()) {

	// open connection to server (resource manager)
	// Having one resource manager puts us in lightweight mode
	MakeCallToMsSqlDatabase();

	// open connection to server again (resource manager)
	// Having two resource managers promotes us to DTC
	// We are within an intranet windows context, so we use OleTx
	MakeCallToMsSqlDatabase();

	// Next we make a call to a non-windows platform
	// We are still using DTC, but we have elevated to WSAT
	MakeCallToOracleDatabaseOnLinux();

	scope.Complete()
}
```

Not all resource managers support promotion.
A resource manager must implement `IPromotableSinglePhaseNotification`.
.NET will call the Promote() method on every `ResourceManager` that implements it.
MSMQ does not implement this interface.

But isn't MSMQ a durable resource manager? Without the interface, how can it promote to DTC?
Well, because MSMQ is can not be promoted, it must start as DTC.
Otherwise we are stuck in Lightweight mode even when we'd need DTC.

Resource Managers manage data participating in transactions.
They are either durable (i.e. resistant to system failures) or volatile.
The transaction types are either long running (with no locks, where locks have severe performance implications) or atomic (using locks). We will focus on the atomic kind and DTC which manages OleTx and WSAT.

### Two Phase Commit Protocol (2PC)
The two phase commit protocol can allow transaction managers to ensure atomicity.
#### Phase 1
 - TM asks every RM involved to vote on committing or rolling back
 - Every RM decides whether to commit or rollback
 - If the RM decides to commit, it stores a copy of the outcome to durable storage (status set to PreparedToCommit)

#### Phase 2
 - TM then decides whether to commit based on the votes
 - If all RMs vote to commit, the TM will signal RMs to commit
 - If any RM votes to rollback, the TM will signal RMs to rollback
 - RMs will then notify the TM of the final status




