class Player:
    def __init__(self, name, id):
        self.nome = name
        self.ID = id
        self.XP = 0
        self.level = 1
        self.points =0
       
    
    def set_XP(self,value):
        self.XP += value
