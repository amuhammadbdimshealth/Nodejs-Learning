function deleteProduct(btn) {
  const prodId = btn.parentNode.querySelector("[name=productId]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const productDOMElement = btn.closest('article');

  fetch("/admin/product/" + prodId, {
    method: "POST",
    headers: {
      "CSRF-Token": csrf,
    },
  })
    .then((result) => {
        return result.json();
    })
    .then(data => {
        console.log("FETCH RESULT",data);
        // window.location.href = "/admin/products"
        productDOMElement.remove();
    })    
    .catch((err) => {
      console.log("FETCH ERROR",err);
    });
}
