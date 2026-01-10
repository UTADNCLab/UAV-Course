1) Why is doing computation onboard a UAV often better than offloading to the ground?

A. Reduces vibration
B. Avoids bandwidth limits and transmission delays
C. Onboard storage is always larger
D. Required by regulations

Correct: B
Why: Ground links are bandwidth-limited and can add delay/failures; onboard helps real-time tasks.
From video: 00:00–00:02



2) In the three-layer architecture, what does the virtualization infrastructure layer do?

A. Holds the physical CPU/GPU
B. Virtualizes hardware so resources can be allocated flexibly
C. Shows user interfaces
D. Stores only mission logs

Correct: B
Why: It provides virtualization of the physical resources.
From video: 00:03–00:04



3) Which was not a key criterion for choosing a UAV single-board computer?

A. Lightweight/compact
B. Efficient power use
C. High mass for stability
D. Strong CPU/GPU and enough memory/storage

Correct: C
Why: Low weight is desired; high mass is not.
From video: 00:04:45–00:06:10


Q4.Which statement is correct about KVM vs Docker? 
 
A. KVM provides stronger isolation and security than Docker and requires fewer system resources. 
B. They perform identically in terms of overhead and isolation. 
C. Docker provides stronger isolation and security than KVM. 
D. Docker containers are lighter and faster to start than KVM virtual machines but have weaker isolation.

Ans: D 


5) What’s the main security/performance trade-off mentioned?

A. VMs = lower overhead, weaker isolation
B. Containers = higher overhead, stronger isolation
C. VMs = stronger isolation but higher overhead
D. Containers = most secure and most resource-hungry

Correct: C
Why: Hypervisor VMs give stronger isolation but cost more overhead; containers are lighter.
From video: 00:08:00–00:10:00



6) Which is a listed benefit of virtualization for UAVs?

A. Infinite battery life
B. Run multiple apps concurrently on one UAV
C. No networking needed
D. Replaces flight controller firmware

Correct: B
Why: Virtualization enables concurrency with resource control.
From video: 00:07:00–00:08:00


7) In coded distributed computing with two workers on 𝐴1 and  𝐴2 , adding a third  workercomputing (𝐴1 + 𝐴2) 𝑋 lets the master: 

A. Finish only after all three respond
B. Finish after any two results arrive
C. Use zero memory
D. Skip encoding
	​
Correct: B
Why: Redundancy avoids the “slowest worker” bottleneck.
From video: 00:12:00–00:13:00

8) What’s the key idea of BPCC?

A. Compress inputs
B. Let workers send partial batch results early for approximate solutions
C. Wait until all workers finish
D. Use encryption instead of encoding

Correct: B
Why: BPCC batches work and streams partial results to reduce completion time.
From video: 00:14:00–00:16:00


9) In BPCC encoding, the matrix 𝐻
H should be chosen so that:

A. It’s diagonal with ones
B. Any 𝑅 rows are full-rank
C. It’s all zeros
D. It depends only on 

Correct: B
Why: Then the master can reconstruct once it has at least R rows of results.
From video: 00:15:00–00:16:00


10) For dynamic BPCC with a master and N workers doing matrix–vector tasks, how many worker failures can be tolerated?

A. 0
B. 1
C.N−1
D. 𝑁

Correct: C
Why: It can complete as long as at least one worker (or the master sharing load) functions.
From video: 00:19:00–00:20:30