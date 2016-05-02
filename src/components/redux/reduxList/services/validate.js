export default function validate(voter)
    {
        let ret = { valid: true , message: ""};
        if (voter && !voter.name )
        {
            ret.valid = false;
            ret.message ="voter name cannot be blank or null";
            return ret;
        }
        if (voter && voter.name && voter.name.trim() =="" )
        {
            ret.valid = false;
            ret.message ="voter name cannot be blank or null";
            return ret;
        }
        if (voter && voter.name && (voter.name.toUpperCase().indexOf("BOZO")) >-1)
        {
            ret.valid = false;
            ret.message ="voter cannot be a bozo!";
            return ret;
        }
        
        return ret;
    }

