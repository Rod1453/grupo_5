/*Agregando tematicas*/
INSERT INTO theme(nombre)
VALUES ('Computación'),('Fantasía'),('Ficción'),('Cocina'),('Videojuegos'),('Terror'),('Ciencia Ficcion'),
		('Contabilidad y Finanzas'),('Clásicos'),('Biologia'),('Novela');

/*Agregando Libros*/
INSERT INTO product(theme_id,titulo,autor,editorial,paginas,idioma,tipo_tapa,precio,sinopsis,stock,fecha_emision,imagen)
VALUES (1,'Codigo Futuro','Martín Martorell','Granica',192,'Español','Blanda',7810,'Vivimos rodeados de tecnología y sin embargo aún no apreciamos por completo su enorme potencial para abrir oportunidades, generar empleo y sacar a tantos latinoamericanos de la pobreza.Ocho historias de personas comunes que cambiaron su vida gracias a la tecnología alimentan la tesis de este libro: la tecnología es el código del futuro. Se trata de un policía, una maestra, un fotógrafo, una ama de casa, un estudiante del secundario, un reciclador urbano, un repartidor de delivery y una conductora de una app de movilidad. Si para ellos fue posible, ¡la próxima historia puede ser la tuya!'
	,5,'2023-01-01','codigoFuturo.jpeg'),(2,'Polvo de sueños','Steven Erikson','NOVA',1168,'Español','Dura',2277.99,'Polvo de sueños es la novena y penúltima entrega de la saga «Malaz: El Libro de los Caídos», la decalogía originalmente publicada entre 1999 y 2011 que ha convertido al escritor canadiense Steven Erikson en una de las mayores voces de la fantasía épica contemporánea. Desde entonces, esta obra maestra de la imaginación está considerada una de las series más ambiciosas del género de los últimos años.'
    ,9,'2018-06-05','PolvoDeSueños.jpg'),(3,'El Alquimista','Paulo Coelho','Editorial Planeta',192,'Español','Dura',5900,'Una fábula inspiradora sobre la importancia de luchar por tus sueños. Considerado ya un clásico de    nuestros días, El Alquimista relata las aventuras de Santiago, un joven pastor andaluz que un día emprende un viaje por las arenas del desierto en busca de un tesoro.'
    ,5,'2021-05-12','elAlquimista.jpeg'),(4,'Pan de Campo','German Torres','Planeta',256,'Español','Blanda',12000,'Ya no podemos hablar de pan blanco o negro. Centeno, trigo sarraceno, teff, sorgo, mijo, avena, kamut, spelta, amaranto, algarroba, maíz morado, quinoa: la aparición de las harinas alternativas forma parte de una segunda ola en la nueva panadería argentina, en la que lo saludable y lo sustentable son tan importantes como el sabor. Con horizontes renovados, Germán Torres interpreta estos alimentos para dar forma a nuevos panes en Pan de Campo.'
    ,5,'2022-05-09','panDeCampo.jpeg'),(5,'ASSASSIN`s CREED: LA ESPADA DE SHAO JUN','Minoji Kurata','NORMA Editorial',598,'Español','Blanda',10629.11,'Año 1526, época en la que China recibía el nombre de Ming. En medio de una gran purga perpetrada por el actual emperador, un grupo de poderosos eunucos pertenecientes a la Orden templaria aprovecha la ocasión para aniquilar a los compañeros de Shao Jun, y esta, convertida en la última Asesina de China, regresa a su país para cobrarse su venganza.Todo esto, sin embargo, no son más que los recuerdos que Lisa, una descendiente de Shao Jun que vive en la Yokohama actual, conserva grabados en sus genes. Preocupada por sus impulsos violentos, Lisa acude a la doctora Kagami, quien le propone llevar a cabo un tratamiento consistente en revivir los recuerdos de su antepasada. Pero lo que ella no sabe es que detrás de todo esto se esconde un conflicto ancestral entre los Asesinos y la Orden templaria que ha llegado hasta nuestros días...'
    ,5,'2023-10-15','assassinCreed.jpeg'),(6,'Los 13 Exorcismos De Salomon Joch','Paul Arquier-Parayre','Obscura Editorial, SL',185,'Español','Blanda',7800,'Acompaña al padre Salomon Joch en su lucha contra el mal en trece historias que culminan en una batalla legendaria El padre Salomon Joch, exorcista al servicio del Vaticano bendecido (o maldecido quizás) con el don de la inmortalidad, ha vivido cosas que la mayoría ni siquiera alcanza a imaginar. Después de milenios luchando contra las fuerzas del mal, ahora nos relata sus aventuras por tierras francesas, donde debe librar trece combates contra las almas que ha poseído un tenebroso ejército comandado nada más ni nada menos que por Lucifer. En cada una de estas batallas, el padre Joch hará frente a demonios que tratan de corromper todo y a todos… Pero estos indicios del mal que el exorcista debe erradicar no son más que la calma que precede a la tormenta, pues una maldición nacida en tiempos inmemoriales está a punto de desatar el Armagedón en una de las tierras más míticas y emblemáticas del paisaje del actual sur de Francia. ¿Estás preparado para viajar hasta el mismísimo Infierno?'
    ,2,'2023/02/10','los13ExorcismosDeSalomonJoch.jpeg'),(7,'Indomitus (Warhammer 40.000)','Gav Thorpe','Minotauro',366,'Español','Blanda',19.45,'Durante unos diez años, la Cruzada Indomitus ha estado luchando una guerra de desafío y reconquista en un Imperium devastado por las contiendas. Adscritos a la Flota de Cruzada Quintus, apodada la Flota Maldita por muchos, los Ultarmarines de la Venganza de Ithraca se ven arrojados a un mundo desolado.'
    ,7,'2021/05/15','indomitus.jpeg');


/*Agregando Usuarios*/
INSERT INTO user(nombre,apellido,email,password,categoria,imagen)
VALUES ('Juan','Perez','juanperez@gmail.com','$2a$10$UQpOUAsHtu09WnzWcwyPiOKltR6447fSTyCmuBsToh9egXf1D4.nm','Administrador','images.png');


/*Agregando Orden*/
INSERT INTO `order`(user_id,fecha)
VALUES (1,'2023/12/01');

/*Agregando productos al carrito*/
INSERT INTO `detail`(product_id,order_id,precio,cantidad)
VALUES (1,1,7810,2),(3,1,5900,1);
