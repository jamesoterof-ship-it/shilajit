/* Direcciones cortas de la tienda.
   jayegroup.com.co/almohada  en vez de  producto.html?p=almohada

   La ficha sigue siendo UNA sola (producto.html + productos.js). Cada carpeta
   lleva un index.html de tres lineas que manda para alla conservando lo que
   venga pegado al link (?cmp=, utm_, etc), que es lo que ata la venta a su
   campaña en el panel.

   AL AGREGAR UN PRODUCTO NUEVO a productos.js hay que volver a correr esto:
     node _rutas-cortas.js
*/
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'productos.js'), 'utf8');

/* Se corta por cada "id:" y el nombre se busca DENTRO de ese trozo: leyendolo
   de corrido, el nombre de un producto se colaba en el del anterior.
   Se parte por el id a secas y no por la llave de apertura, porque algun
   producto trae un comentario entre la llave y el id (le paso a kinoki, que
   se quedaba sin direccion corta sin que nadie lo notara). */
const marcas = [...src.matchAll(/^\s*id:\s*'([a-z0-9\-]+)'/gm)];
const productos = marcas.map((m, i) => {
  const desde = m.index;
  const hasta = i + 1 < marcas.length ? marcas[i + 1].index : src.length;
  const trozo = src.slice(desde, hasta);
  return { id: m[1], nombre: (trozo.match(/\bnombre:\s*'([^']+)'/) || [])[1] || m[1] };
});

if (!productos.length) { console.log('X no encontre productos en productos.js'); process.exit(1); }

productos.forEach(({ id, nombre }) => {
  const destino = '/producto.html?p=' + id;
  const html = '<!doctype html>\n<html lang="es">\n<head>\n'
    + '<meta charset="utf-8">\n'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
    + '<title>' + nombre + ' · Jaye Group Chile</title>\n'
    + '<link rel="canonical" href="https://jayegroup.com.co/' + id + '/">\n'
    + '<!-- Direccion corta. No duplica la ficha: solo manda para alla. -->\n'
    + '<script>\n'
    + '  var extra = location.search ? ("&" + location.search.slice(1)) : "";\n'
    + '  location.replace("' + destino + '" + extra + location.hash);\n'
    + '<\/script>\n'
    + '<meta http-equiv="refresh" content="0;url=' + destino + '">\n'
    + '</head>\n<body>\n'
    + '<p>Llevándote a <a href="' + destino + '">' + nombre + '</a>…</p>\n'
    + '</body>\n</html>\n';
  fs.mkdirSync(path.join(__dirname, id), { recursive: true });
  fs.writeFileSync(path.join(__dirname, id, 'index.html'), html);
  console.log('   jayegroup.com.co/' + id.padEnd(10) + '  ->  ' + nombre);
});
console.log('');
console.log(productos.length + ' direcciones cortas listas.');
