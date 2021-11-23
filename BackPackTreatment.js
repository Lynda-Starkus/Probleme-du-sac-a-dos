
import{objets} from './main.js'
import{capMax} from './main.js'



class objetAEmporter //Class Contenant les Objets qu'on voudrait mettre dans le sac 
{
    constructor(name, poids, valeur)
    {
        this.poids = poids;
        this.valeur = valeur ;
        this.name = name;
    }
    get getValeur()
    {
        return this.valeur;
    }
    get getPoids()
    {
        return this.poids;
    }

    get getName()
    {
        return this.name;
    }
}



function remplirSac (listeObj, W) 
{
    let T  = Array.from(Array( listeObj.length ), () => new Array(W)); //crée une matrice n.W vide
    
    for (let i = 0; i< listeObj.length ; i ++) //Pour chaque objet de la liste
    {
        for (let c=0; c<=W; c++) //Pour chaque capacité du sac
        {
           if (c>= listeObj[i].getPoids) //L'objet peut rentrer dans le sac
           {
            if (i != 0)   
            {
                T[i][c] = Math.max(T[i-1][c], T[i-1][c - listeObj[i].getPoids] + listeObj[i].getValeur );
            }
            else
            {
                T[i][c] = listeObj[i].getValeur;
            }
           }
           else //l'objet ne rentre pas, on garde la case d'avant, ou 0 si c'est la première case
           {
                if (i == 0) T[i][c] = 0;
                else T[i][c] = T[i-1][c]; 
           }
        }
    }
    console.table(T);
    return T;
}

function objetsPris (listeObj, matrice ) 
{
    let listeObjetsPris = [];
    let i = matrice.length -1;
    let c = matrice[0].length -1;
    if (matrice[i][c] != 0)
    {
        while ( matrice[i][c] == matrice[i][c -1])
        {
            c--;
        }
        while ( matrice[i][c] == matrice[i -1][c])
        {
            i--;
        }
        listeObjetsPris.push(listeObj[i]);
        let val = matrice[i][c] - listeObj[i].getValeur;
        c = c - listeObj[i].getPoids;
        while (c !=0 || val != 0)
        {
            let i = 0;
            while( matrice[i][c] < val) i ++;
            listeObjetsPris.push(listeObj[i].name);
            val = matrice[i][c] - listeObj[i].getValeur;
            c -= listeObj[i].getPoids;
        }
    }
    return listeObjetsPris;
}




let listeObj;

    for(var i=0; i<objets.length; ++i){
        listeObj.push(new objetAEmporter(objets[i].weight, objets[i].value, objets[i].name));
    }

    result = objetsPris(listeObj,remplirSac( listeObj, capMax));

export{result};