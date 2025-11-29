let invoices = {
  unpaid: [],
};

invoices.add = function(name, amount) {
  this.unpaid.push({ name, amount });
};

invoices.totalDue = function() {
  let total = 0;
  this.unpaid.forEach(invoice => {
    total += invoice.amount;
  });
  return total;
};

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

console.log(invoices.totalDue()); // 737.5

invoices.paid = [];

invoices.payInvoice = function(name) {
  const unpaid = [];
  this.unpaid.forEach(invoice => {
    invoice.name === name ? this.paid.push(invoice) : unpaid.push(invoice);
  });
  this.unpaid = unpaid;
};

invoices.totalPaid = function() {
  let total = 0;
  this.paid.forEach(invoice => {
    total += invoice.amount;
  });
  return total;
};

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');
console.log(invoices.totalPaid()); // 550
console.log(invoices.totalDue());  // 187.5

