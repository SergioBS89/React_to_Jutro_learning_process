export default function Shop({children}) {
  /**
   * A good way to reuse a component like this what iterates all the products, is using children props 
   */
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
       {children}
      </ul>
    </section>
  );
}
