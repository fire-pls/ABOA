class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(delivered:false)
    end
  end

  def index?
    user.admin
  end

  def show?
    record.user == user || user.admin
  end

  def update?
    record.user == user || user.admin
  end

  def destroy?
    user.admin
  end
end
