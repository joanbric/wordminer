<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/definer">Definer</a></li>
        </ul>
    </nav>
</header>

<style>
    header{
        background-color: var(--clr-pri-dark);
        margin-bottom: 2rem;
        
    }
    nav{
        padding-inline-end: 20px;
    }
    ul{
        display: flex;
        gap: 2rem;
        justify-content: end;
        align-items: center;
        
    }
    li{
        flex-shrink: 1;
    }
    li:hover{
        background-color: var(--clr-opt-dark);
    }
    a{
        display: inline-block;
        text-decoration: none;
        color: white;
        font-size: 1rem;
        padding: 1rem .5rem;

    }
</style>