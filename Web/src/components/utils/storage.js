
export const getFromStorage =(key) =>
{
    if(!key)
    {
        return null;
    }

    try 
    {
        const valueStr = localStorage.getItem(key);
        if(valueStr)
        {
            return JSON.parse(valueStr);
        }
        return null;
        
    }
    catch (error) 
    {
        return null;
    }
};

export const removeFromStorage =(key) =>
{
    if(!key)
    {
        return null;
    }

    try 
    {
        localStorage.removeItem(key);
        
    }
    catch (error) 
    {
        return null;
    }
};

export const setInStorage = (key , obj) =>
{
    if(!key)
    {
        console.log("Error : Key is missing");

    }

    try 
    {
        localStorage.setItem(key, JSON.stringify(obj));     
    } 
    catch (error) 
    {
        console.error(`Error occured during setting to storage : ${error}`);
    
    }
};