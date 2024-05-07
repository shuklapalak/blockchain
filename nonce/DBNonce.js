class DBNonce {

  filterPendingTxn(transactions) {
    const res = transactions.filter(transaction => {
      return transaction.status === 'PENDING';
    });
    return res.length;
  }

  generateNextNonce(account) {
    const result =  Nonce.findAll({
      where: {
        account: account,
      },
    });

    if (filterPendingTxn()) throw Error("Transaction is pending. Cannot add new one");
    return result.length > 0 ? result.length + 1 : 0
  }

  addTxn(account) {
    const nextNonce = generateNextNonce(account);
    // Add transaction in nonce table
    const res = await Nonce.create({ account: account, nonce: nextNonce, creation_time: new Date(), address: null, status: "PENDING" });
    return res;
  }



  succeedTnx(txnId, address, status) {
    // Update the address, status of transaction
    return  await Nonce.update(
      { address, status},
      {
        where: {
          id: txnId,
        },
      },
    );
  }

  failedTnx(txnId) {
    // Remove the transaction
    return await Nonce.destroy({
      where: {
        id: txnId,
      },
    });
  }
}
