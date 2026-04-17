# Laboration 2: Att göra-applikation

Detta projekt är en del av kursen Programmering i TypeScript. Syftet var att skapa en enkel och responsiv to do-app med TypeScript och objektorienterad programmering

## 🔗 [Länk till sidan](https://attgoralista.netlify.app/)

### 🛠 Såhär är projektet byggt

Jag har delat upp det i tre delar för att hålla ordning och reda i koden. 

* Interface (Todo.ts) som definierar vilka egenskaper e uppgift ska ha.

* Klass (TodoList.ts) sköter all logik. Klassen sköter listan med uppgifter, validering för att inte kunna lägga till tomma uppgifter och sparar allt till LocalStorage så att listan finns kvar när sidan laddas om. 

* Hantering av webbplatsen (main.ts) sköter allt som syns på skärmen. Den lyssnar på knappar och ritar upp listan, men rör inte själva datan.

### Funktioner

* Prioritering: Du kan välja prioritet 1-3, vilket ändrar färgen på ena kanten. 

* Spara: Listan sparas i webbläsaren.

* Markera som klar: Klicka på färdig för att bocka av uppgiften. 

* Ta bort: Möjlighet att radera uppgifter. 
