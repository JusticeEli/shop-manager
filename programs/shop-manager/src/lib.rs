use anchor_lang::prelude::*;
use serde::{Serialize, Deserialize};
use std::string;

declare_id!("8agPo1zq2ZvXLqsgH5RuhxFJGJrsPTSSopZiYixYJXZy");

#[program]
pub mod shop_manager {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let mut goods_account = &mut ctx.accounts.goods_account;
        goods_account.goods = vec![];
        msg!("goods:{:?}", goods_account);

       
        Ok(())
    }
    pub fn insert_goods(ctx: Context<AddGoods>, good: Good) -> Result<()> {
        let goods_account = &mut ctx.accounts.goods_account;
        msg!(
            "good:{:?},size:{} bytes",
            good,
            good.try_to_vec().unwrap().len()
        );
        goods_account.goods.push(good);
        msg!("goods:{:?}", goods_account.goods);
        Ok(())
    }
    pub fn update_goods(ctx: Context<AddGoods>, good: Good) -> Result<()> {
        let goods_account = &mut ctx.accounts.goods_account;
        msg!("good:{:?}", good);
        let position = goods_account.goods.iter().position(|goodIter| goodIter.id == good.id).unwrap();
        goods_account.goods.remove(position);
        goods_account.goods.push(good);
        msg!("goods:{:?}", goods_account.goods);
        Ok(())
    }
    pub fn delete_goods(ctx: Context<AddGoods>, good_id: u64) -> Result<()> {
        let goods_account = &mut ctx.accounts.goods_account;
        msg!("goodId:{}", good_id);
        let position = goods_account.goods.iter().position(|good| good.id == good_id).unwrap();
        goods_account.goods.remove(position);
        msg!("goods:{:?}", goods_account.goods);
        Ok(())
    }   
      pub fn delete_all_goods(ctx: Context<AddGoods>,) -> Result<()> {
        let goods_account = &mut ctx.accounts.goods_account;
         goods_account.goods.clear();
        msg!("goods:{:?}", goods_account.goods);
        Ok(())
    }  

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,payer=user,space=5000)]
    pub goods_account: Account<'info, GoodsAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct AddGoods<'info> {
    #[account(mut)]
    pub goods_account: Account<'info, GoodsAccount>,
}

#[derive(Default, Debug)]
#[account]
pub struct GoodsAccount {
    pub goods: Vec<Good>,
}


#[derive(Default, AnchorDeserialize, AnchorSerialize, Clone, Debug,Serialize,Deserialize)]
pub struct Good {
    pub id: u64,
    pub name: String,
    pub image: String,
    pub price: u32,
}


impl PartialEq for Good {
    fn eq(&self, other: &Self) -> bool {
        self.id==other.id
    }
    
    
}
