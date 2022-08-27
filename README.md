# shop-manager
Solana program build with anchor framework,its used to manager records of goods in a shop


## Development

### Environment Setup

1. Install the latest Solana tools from from https://docs.solana.com/cli/install-solana-cli-tools.
2. Install the latest Rust stable from https://rustup.rs/. If you already have Rust, run `rustup update` to get the latest version.
3. Install the `anchor-cli` from `cargo package manager` https://crates.io/crates/anchor-cli.

### Build

```bash
# To build  on-chain program
$ anchor build
```
```bash
### Deploy program

$ anchor deploy

```

### Test

Unit tests contained within root of the project:
```bash
$ anchor test      # <-- runs host-based tests

```


