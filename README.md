# Shop Manager Program
This program provides an interface and implementation that  can be utilized to do CRUD operations on goods stored in solana network.

Its build using  anchor framework.

The main aim of this program is to  manager records of goods in a shop.

The [frontend](https://github.com/JusticeEli/ShopManagement/tree/branch_1) communicating with this program is a Native android application written using `Java` and `Kotlin`.

The android application uses a [Rest api](https://github.com/JusticeEli/shop-manager-api) to communicate with the on-chain program ,the backend is build using `Rust actix-web framework`.


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


