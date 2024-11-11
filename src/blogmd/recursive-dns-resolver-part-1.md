# Pickel DNS - A Recursive DNS Resolver in Rust (Part 1)
----
November 11, 2024

#### What is DNS?

DNS or Domain Name System is a mapping of human-readable domain names to machine IP addresses. DNS works by having servers that does DNS lookups or DNS resolving which essentially means looking up the IP from a server that knows about it.

In resolving a domain name from when a user types [google.com](http://google.com/) in their browser to the browser loading that page, there are 4 DNS servers involved.

1.  Recursive DNS Server

The DNS Recursor is the server that is designed to be the closest to the client. It takes the DNS query and do additional lookups it by making requests to higher and higher level servers until it satisfies the query.

2.  Root Nameserver

A root nameserver will typically contain a reference to more specific locations about where the record is stored and they will then route the request to the next correct nameserver. There are 13 IP addressees with servers all around the world which are considered the Root Nameservers.

3.  TLD (Top level Domain) Nameserver

This nameserver will have information on domains that share the same extension; for example .com is a general extension whereas .in is the TLD for India and will be managed by the country.

4. Authoritative Nameserver

When the response is received from a TLD nameserver, the response then directs to the authoritative nameserver. The server contains information which will be specific to the domain name, like A records which gives the recursive resolver with the IP address of the server that hosts that particular domain. This final piece of information takes the user to the correct place.

The above seems like a lot of requests just for DNS resolution and honestly it is. That is why the servers will use caching, anycast routing along with other advanced methods to make this process as fast as possible. Typically the endusers will be using the DNS resolvers of their ISP but they can use their own hosted resolver or one of the publicly hosted resolvers like the one provided by Cloudflare at 1.1.1.1.

&nbsp;  
#### Why was I looking into DNS again?

Ah yes, I have some upcoming things at work which involves DNS related stuff. So like a great employee that I am, I decided to look into DNS again and refresh my lost knowledge from university over the weekend. All the above is very interesting but is it even fun to just read about it? You guessed it correct, it is not fun. And that is why I have decided to make my own recursive dns resolver.

The thought of playing with raw network packets while managing recursive queries as well implementing caching to make a high performance application… that sounds like a project meant to be written in Rust, and so I ran the trusty cargo command.

```bash
cargo new pickle-dns --bin
```

(Don't ask why I chose the name `pickle-dns` because there is literally no reason for it.)

Woohoo, I have another new empty project in my directory (graveyard) of projects. To actually not let this project die, I started researching and making a plan (yes shocking). After arguing a bunch with ChatGPT and looking at some resources online. I came up with the below very rough plan on how to go about the process.

- Read and understand the DNS Packet Structure (RFC 1035) as well as how Recursive DNS resolvers are typically made.
- Define the packet structures in Rust’s beautiful type system.
- Serialize and Deserialize DNS messages to be able to send them over UDP.
- Start by querying one of the root servers and parsing the response.
- Implement the recursive part and continue querying down the DNS hierarchy, moving from TLDs to authoritative servers.
- Implement some sort of caching for faster lookups.


According to the above plan, I have made some progression on points 1 and 2. Can be found on GitHub at [Pickle DNS](https://github.com/chauhanswapnil/pickle-dns). The next part of this mini series will be on capturing DNS packets and understanding their structure.
